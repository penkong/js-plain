// ==========================================================
//ts must understand about type pass from one file to another
// therefore we use namespaces and file bundling.
// for group code together.
// Drag and drop
// namespace App {
export interface Draggable {
  // two listeners
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  // signal to js what we darg over is valid target
  dragOverHandler(event: DragEvent): void;
  // react to the actual drop that happens;
  dropHandler(event: DragEvent): void;
  // for give visual feedback to user
  dragLeaveHandler(event: DragEvent): void;
}
// }
