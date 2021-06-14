export function promise_a_(projects, _promise) {
    const promise_a = [];
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        promise_a.push(_promise(project));
    }
    return promise_a;
}
//# sourceMappingURL=src/promise_a_.js.map