import type { TodoItem } from "lib/state";
import { useRef } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { XYCoord } from "dnd-core";
import cn from "classnames";

interface TaskBucketProps {
  children: React.ReactNode;
  onDrop: (item: DragItem) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function TaskBucket({ children, onDrop }: TaskBucketProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      onDrop(item);
    },
  });

  drop(ref);
  return (
    <div ref={ref} data-handler-id={handlerId} className={"bg-gray-200 rounded-3xl shadow-xl p-4"}>
      {children}
    </div>
  );
}
