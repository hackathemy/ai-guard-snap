import {
  address,
  divider,
  heading,
  panel,
  row,
  spinner,
  text,
} from '@metamask/snaps-sdk';

import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  const data: any = request.params;
  let result = null;
  try {
    const response = await fetch('http://localhost:3000/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    result = await response.json();
    console.log(result);
  } catch (exception) {
    console.log(exception);
  }
  switch (request.method) {
    case 'ai-guard':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading(`💂 AI GUARD`),
            text('Is contract secure ?'),
            address(data.data.params[0].to),
            divider(),
            text(JSON.stringify(result.short)),
            divider(),
            text(JSON.stringify(result.long)),
            text(
              'Continue Chat with AI GUARD [Detail](https://chat.openai.com/).',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
