import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Pre-typed versions of the plain `useDispatch` and `useSelector` hooks so
// every component gets full autocomplete + type-checking on `state` without
// re-typing `useSelector<RootState>` everywhere.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
