# RCC Admin Starter

A reusable component collection (RCC) for admin-panel style React apps —
built as a modern rewrite of an older Create React App + Formik codebase.
Meant to be dropped into any new project and extended, not a finished product.

## Stack

| Concern       | Library                                   |
| -------------- | ------------------------------------------ |
| Build tool     | Vite                                       |
| UI kit         | MUI (Material UI) v9                       |
| Forms          | react-hook-form + zod                      |
| State          | Redux Toolkit                              |
| HTTP           | Axios (single instance, see `src/lib/axios.ts`) |
| Routing        | React Router v7                            |
| Dates          | dayjs + MUI X Date Pickers                 |

### Why these choices

- **react-hook-form + zod** instead of Formik + yup: fewer re-renders, and the
  zod schema doubles as your TypeScript type (`z.infer<typeof schema>`) —
  one source of truth instead of keeping a schema and an interface in sync.
- **One axios instance** (`src/lib/axios.ts`): auth headers, base URL, and
  error → toast handling live in one interceptor, so feature code just calls
  `api.get(...)` and never repeats `catch (e) { toast.error(...) }`.
- **Removed from the original `package.json`**: Formik, Yup, Draft.js +
  draftjs-to-html + html-to-draftjs + react-draft-wysiwyg + quill/react-quill
  (pick ONE rich text editor when you need one — Tiptap is the modern
  choice), moment + moment-timezone (dayjs replaces both), uuidv4 (uuid
  alone is enough), rsuite (redundant second UI kit next to MUI), Immutable.js,
  redux-logger, and several one-off utility packages (`i`, `remove`,
  `calculate-aspect-ratio`, `country-calling-code`, `country-state-picker`)
  that are either dead weight or trivial to inline. Add back only what an
  actual feature needs.

## Folder structure

```
src/
  app/            Redux store + typed hooks (useAppDispatch/useAppSelector)
  lib/             Cross-cutting infrastructure (axios instance, etc.)
  theme/           Single MUI theme file — colors, typography, component overrides
  types/           Types shared across MORE THAN ONE feature (pagination shape, etc.)
  components/
    ui/            Generic, feature-agnostic UI: Button, DataTable's siblings
                    (Loader, EmptyState, PageHeader, ConfirmDialog, StatusChip),
                    AppLayout
    table/         DataTable — the generic table component (see below)
    form/           react-hook-form-connected inputs: FormTextField, FormSelect,
                    FormCheckbox, FormDatePicker
  features/
    <feature>/     Everything about ONE feature lives together:
                     <feature>.types.ts   — TS types for this feature's data
                     <feature>.schema.ts  — zod schema (+ inferred form type)
                     <feature>.api.ts     — axios calls for this feature only
                     use<Feature>List.ts  — list-page state/logic hook
                     <Feature>ListPage.tsx
                     <Feature>FormPage.tsx
  routes/          AppRoutes.tsx — the one file where you register new pages
```

## The reusable `DataTable`

This is the direct answer to "so many tables are called on many pages" —
instead of a new `<XyzListing>` component per feature, you describe the
columns and hand over the rows:

```tsx
<DataTable<Employee>
  columns={[
    { key: "name", headerName: "Employee Name", truncateAt: 20 },
    { key: "email", headerName: "Email", truncateAt: 25 },
    { key: "status", headerName: "Status", render: (row) => <StatusChip label={row.status} /> },
  ]}
  rows={employees}
  getRowId={(row) => row.id}
  loading={loading}
  page={page}
  limit={limit}
  total={total}
  onPageChange={setPage}
  actions={[
    { label: "Edit", onClick: (row) => navigate(`/employees/${row.id}`) },
    { label: "Delete", destructive: true, onClick: (row) => setPendingDeleteId(row.id) },
  ]}
/>
```

- Long text truncates with a hover tooltip automatically via `truncateAt` —
  no more copy-pasted `value.length > 15 ? <Tooltip>... : ...` per cell.
- Row actions render as a kebab menu; pass `hidden`/`disabled` per-action
  callbacks for role-based visibility.
- Omit `page`/`limit`/`total`/`onPageChange` entirely for a plain,
  non-paginated table.

See `src/features/employees/EmployeeListPage.tsx` for the full example this
is lifted from.

## The reusable form fields

Each field component (`FormTextField`, `FormSelect`, `FormCheckbox`,
`FormDatePicker`) takes `name` + `control` from `useForm()` and wires itself
to react-hook-form via `useController` — no `useField`/`meta.touched`
bookkeeping like the old Formik inputs.

```tsx
const { control, handleSubmit } = useForm<EmployeeFormSchema>({
  resolver: zodResolver(employeeFormSchema),
  defaultValues: employeeFormDefaultValues,
});

<FormTextField name="name" control={control} label="Full Name" />
<FormSelect name="role" control={control} label="Role" options={ROLE_OPTIONS} />
```

`name` is type-checked against your schema's inferred type — a typo in the
field name is a compile error, not a runtime bug.

See `src/features/employees/EmployeeFormPage.tsx` for the full add/edit
pattern (one page, one schema, handles both create and update).

## Adding a new feature (e.g. "Manufacturers")

1. `src/features/manufacturers/manufacturers.types.ts` — data shape.
2. `manufacturers.schema.ts` — zod schema for the add/edit form.
3. `manufacturers.api.ts` — axios calls, following `employees.api.ts`.
4. `useManufacturerList.ts` — copy `useEmployeeList.ts`, swap the API calls.
5. `ManufacturerListPage.tsx` — copy `EmployeeListPage.tsx`, swap the
   `columns` array and the hook.
6. `ManufacturerFormPage.tsx` — copy `EmployeeFormPage.tsx`, swap the schema
   and fields.
7. Register both pages in `src/routes/AppRoutes.tsx` and add a nav entry in
   `src/components/ui/AppLayout.tsx`.

No new table or form-input component needed — that's the point.

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL
npm run dev
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run preview` — preview the production build locally
- `npm run lint` — oxlint

## Notes on MUI v9

This starter uses the current MUI major (v9), which **removed direct system.
props from `Box`, `Stack`, `Typography`, and `Grid`** (e.g. `<Box display="flex" gap={2}>`
no longer type-checks). Use the `sx` prop instead:
`<Box sx={{ display: "flex", gap: 2 }}>`. All components in this repo already
follow that convention — keep doing so as you add more.
