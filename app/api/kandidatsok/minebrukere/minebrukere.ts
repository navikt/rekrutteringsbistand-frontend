"use client";
/**
 * Endepunkt /minebrukere
 */
import useSWRImmutable from "swr/immutable";
import { postApiWithSchema } from "../../fetcher";
import { kandidatSokSchema } from "../types";

const minebrukereEndepunkt = "/api/kandidatsok/minebrukere";

export const useMinebrukere = () =>
  useSWRImmutable(
    {
      url: minebrukereEndepunkt,
    },
    (data) => {
      return postApiWithSchema(kandidatSokSchema)(data);
    },
  );
