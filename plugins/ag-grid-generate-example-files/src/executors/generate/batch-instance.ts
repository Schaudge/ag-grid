import type { ExecutorContext } from '@nx/devkit';
import type { BatchExecutorTaskResult } from 'ag-shared/plugin-utils';

import type { ExecutorOptions } from './executor';
import generateFiles from './executor';

export type Message = {
    taskName: string;
    options: ExecutorOptions;
    context: ExecutorContext;
};

export default async function processor(msg: Message) {
    const { options, taskName } = msg;

    let result: BatchExecutorTaskResult;
    try {
        await generateFiles(options);
        result = { task: taskName, result: { success: true, terminalOutput: '' } };
    } catch (e) {
        result = { task: taskName, result: { success: false, terminalOutput: `${e}` } };
    }

    return result;
}
