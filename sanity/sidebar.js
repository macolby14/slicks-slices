import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build custom sidebar

export default function Sidebar() {
  return S.list()
    .title(`Slice's Slices`)
    .items([
      // New sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      // Add already existing items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
