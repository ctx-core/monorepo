import type { project_type } from './project_type';
export declare function _promise_a1<O extends unknown>(projects: project_type[], _promise: (project: project_type) => Promise<O>): Promise<O>[];
