/* eslint-env jest */
/**
 * @fileoverview  help avoid overue of div elements.
 * @author Ethan Cohen modified heading-has-content-test.js rule by Felicia Kovacs
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/myrule';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Headings must have content and the content must be accessible by a screen reader.',
  type: 'JSXOpeningElement',
};

const components = [{
  components: ['Button'],
}];

ruleTester.run('enforce-button-on-apply-content', rule, {
  valid: [
    // DEFAULT ELEMENT TESTS
    { code: '<button>apply</button>' },
    { code: '<button>Apply</button>' },
    { code: '<button>APPLY</button>' },
    { code: '<button><Apply /></button>' },
    { code: '<button>{apply}</button>' },
    { code: '<button>{Apply}</button>' },
    { code: '<button>{APPLY}</button>' },
    { code: '<button>{apply.description}</button>' },
    { code: '<button dangerouslySetInnerHTML={{ __html: "apply" }} />' },
    { code: '<button dangerouslySetInnerHTML={{ __html: "Apply" }} />' },
    { code: '<button dangerouslySetInnerHTML={{ __html: "APPLY" }} />' },
    { code: '<button children={children} />' },

    // CUSTOM ELEMENT TESTS FOR COMPONENTS OPTION
    { code: '<Button>apply</Button>', options: components },
    { code: '<Button>Apply</Button>', options: components },
    { code: '<Button>APPLY</Button>', options: components },
    { code: '<Button><Description /></Button>', options: components },
    { code: '<Button>{apply}</Button>', options: components },
    { code: '<Button>{Apply}</Button>', options: components },
    { code: '<Button>{APPLY}</Button>', options: components },
    { code: '<Button>{apply.description}</Button>', options: components },
    { code: '<Button dangerouslySetInnerHTML={{ __html: "apply" }} />', options: components },
    { code: '<Button children={children} />', options: components },
    { code: '<button aria-hidden />' },
  ].map(parserOptionsMapper),
  invalid: [
    // DEFAULT ELEMENT TESTS
    { code: '<button />', errors: [expectedError] },
    { code: '<button><Description aria-hidden /></button>', errors: [expectedError] },
    { code: '<button>{undefined}</button>', errors: [expectedError] },
    { code: '<div />', errors: [expectedError] },
    { code: '<div>apply</div>', errors: [expectedError] },
    { code: '<div>Apply</div>', errors: [expectedError] },
    { code: '<div>APPLY</div>', errors: [expectedError] },
    { code: '<div>{undefined}</div>', errors: [expectedError] },

    // CUSTOM ELEMENT TESTS FOR COMPONENTS OPTION
    { code: '<Button />', errors: [expectedError], options: components },
    { code: '<Button><Bar aria-hidden /></Button>', errors: [expectedError], options: components },
    { code: '<Button>{undefined}</Button>', errors: [expectedError], options: components },
  ].map(parserOptionsMapper),
});
