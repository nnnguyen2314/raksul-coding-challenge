"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { usePrices } from "../hooks/usePrices";
import { setExpanded, setHover, setPaperSize, setSelected } from "../store/slice";
import { PaperSize } from "../misc/types";
import { INITIAL_VISIBLE_ROWS } from "../misc/constants";
import { PaperSizeSelect } from "../components/PaperSizeSelect";
import { PriceGrid } from "../components/PriceGrid";
import { OrderBar } from "../components/OrderBar";

export function PriceTableContainer() {
  const dispatch = useAppDispatch();
  const { paperSize, selected, hover, expanded } = useAppSelector((s) => s.priceTable);
  const { data, isLoading, isError } = usePrices(paperSize);

  const visibleRows = expanded ? data?.length ?? INITIAL_VISIBLE_ROWS : INITIAL_VISIBLE_ROWS;

  const selectedPrice = React.useMemo(() => {
    if (!data || !selected) return null;
    const cell = data[selected.row]?.[selected.col];
    return cell?.price ?? null;
  }, [data, selected]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
      <div className="border p-4 bg-zinc-100">
        <PaperSizeSelect value={paperSize as PaperSize} onChange={(v) => dispatch(setPaperSize(v))} />
        <button className="mt-4 border rounded px-4 py-2 bg-white" onClick={() => { /* no-op for now */ }}>Apply</button>
      </div>
      <div className="border p-4 bg-zinc-100">
        {isLoading && <div>Loading…</div>}
        {isError && <div>Error loading prices</div>}
        {!isLoading && !isError && (
          <>
            <PriceGrid
              data={data}
              visibleRows={visibleRows}
              selected={selected}
              hover={hover}
              onHover={(pos) => dispatch(setHover(pos))}
              onSelect={(pos) => dispatch(setSelected(pos))}
            />
            {!expanded && (
              <button className="mt-3 text-sm underline" onClick={() => dispatch(setExpanded(true))}>
                See more
              </button>
            )}
          </>
        )}
      </div>
      <div className="md:col-span-2">
        <OrderBar price={selectedPrice} />
      </div>
    </div>
  );
}
