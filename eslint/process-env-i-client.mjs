const rule = {
  meta: {
    type: 'problem',
    messages: {
      noProcessEnv:
        'Ikke bruk process.env i klientkode. Bruk en env-helper (for eksempel "@/util/env") eller send verdien som prop fra en Server Component i stedet.',
    },
  },
  create(context) {
    let isClientFile = false;

    return {
      ExpressionStatement(node) {
        if (node.directive === 'use client') {
          isClientFile = true;
        }
      },
      MemberExpression(node) {
        if (!isClientFile) return;
        if (
          node.object.type === 'Identifier' &&
          node.object.name === 'process' &&
          node.property.name === 'env'
        ) {
          context.report({ node, messageId: 'noProcessEnv' });
        }
      },
    };
  },
};

export default {
  rules: {
    'no-process-env-in-client': rule,
  },
};
