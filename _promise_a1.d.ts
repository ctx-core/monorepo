import type { rush_project_type } from './rush_project_type';
export declare function _promise_a1<O extends unknown>(projects: rush_project_type[], _promise: (project: rush_project_type) => Promise<O>): Promise<O>[];
