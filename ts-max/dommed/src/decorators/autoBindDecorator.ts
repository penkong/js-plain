namespace App {
  // ============================================================
  // auto bind decorator for bind this;
  export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    console.log(descriptor);
    const originalMethod = descriptor.value;
    const adjustDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjustDescriptor;
  }
}
