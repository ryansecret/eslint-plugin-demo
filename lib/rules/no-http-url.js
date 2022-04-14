/**
 * @fileoverview  检查代码中是否存在 http 链接
 * @author chenjingnan
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    schema: [],
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: " 检查代码中是否存在 http 链接 ",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    messages: {
      noHttpUrl: 'Recommended "{{ url }}" switch to HTTPS' // 带占位符的提示信息
    }
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      Literal: function handleRequires(node) {
        if (
          node.value &&
          typeof node.value === 'string' &&
          node.value.indexOf('http:') === 0
        ) {
          context.report({
            node,
            messageId: 'noHttpUrl',
            data: {  // (可选的) data 中的数据可用作 message 的占位符
              url: node.value
            },
            // 替换 http 为 https
            fix: fixer => {
              return fixer.replaceText(
                node,
                `'${node.value.replace('http:', 'https:')}'`
              )
            }
          })
        }
      }
    }


  },
};
