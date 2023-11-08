import { adsItem } from './adsItem';

export const generateListAds = (items) => {
  return `
    <thead>
      <tr class="table-row">
        <th>Network</th>
        <th>Status</th>
        <th>Email</th>
        <th>Phone</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${items
        .map((item) => {
          return adsItem(item);
        })
        .join('')}
    </tbody>
  `;
};
