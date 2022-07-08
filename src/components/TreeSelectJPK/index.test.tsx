import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TreeSelectJPK from './index';

describe('<TreeSelectJPK />', () => {
  it('render TreeSelectJPK with dumi', () => {
    const msg = 'dumi';
    const treeData = [
      { id: '1', s: '1' },
      { id: '1-1', s: '1-1', pd: '1' },
      { id: '1-2', s: '1-2', pd: '1' },
      { id: '1-3', s: '1-3', pd: '1' },
      { id: '2', s: '2' },
      { id: '2-1', s: '2-1', pd: '2' },
      { id: '2-1-1', s: '2-1-1', pd: '2-1' },
      { id: '2-1-2', s: '2-1-2', pd: '2-1' },
      { id: '2-2', s: '2-2', pd: '2' },
      { id: '2-3', s: '2-3', pd: '2' },
    ];
    render(
      <TreeSelectJPK
        selectProps={{ style: { width: 300 } }}
        treeData={treeData}
        treeDataSimpleMode
        simpleModePropName={{
          title: 's',
          pId: 'pd',
        }}
      />,
    );
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
