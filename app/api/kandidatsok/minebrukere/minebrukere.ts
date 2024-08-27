"use client";
/**
 * Endepunkt /minebrukere
 */
import useSWRImmutable from "swr/immutable";
import { getAPIwithSchema } from "../../fetcher";
import { kandidatSokSchema } from "../types";

const minebrukereEndepunkt = "/api/kandidatsok/minebrukere";

export const useMinebrukere = () =>
  useSWRImmutable(minebrukereEndepunkt, (data) => {
    return getAPIwithSchema(kandidatSokSchema)(data);
  });
