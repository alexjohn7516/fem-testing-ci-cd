import reducer, {
  add,
  remove,
  toggle,
  markAllAsUnpacked,
  update,
} from './items-slice';

it('returns an empty array as the initial state', () => {
  expect(reducer(undefined, { type: 'noop' })).toEqual([]);
});

it('supports adding an item with the correct name', () => {
  expect.hasAssertions();
  const result = reducer([], add({ name: 'iPhone' }));
  // expect(result[0].name).toBe('iPhone'); // naive test
  expect(result).toEqual([expect.objectContaining({ name: 'iPhone' })]);
});

it('prefixes ids with "item-"', () => {
  expect.hasAssertions();
  const result = reducer([], add({ name: 'iPhone' }));
  // expect(result[0].id.startsWith('item-')).toEqual(true ); // this is not safe
  // test could have none and fail or two and run good.
  expect(result).toEqual([
    expect.objectContaining({ id: expect.stringMatching(/^item-/) }),
  ]);
});

it('defaults new items to a packed status of false', () => {
  expect.hasAssertions();
  const result = reducer([], add({ name: 'iPhone' }));
  expect(result).toEqual([expect.objectContaining({ packed: false })]);
});

it('supports removing an item', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, remove({ id: '1' }));
  expect(result).not.toContain(expect.objectContaining({ id: '1' }));
});

it('supports toggling an item', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, toggle({ id: '1' }));
  expect(result[0].id).toEqual('1');
});

it('supports updating an item', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(
    state,
    update({ id: '1', name: 'Samsung Galaxy S23' }),
  );
  expect(result[0].name).toEqual('Samsung Galaxy S23');
});

it('supports marking all items as unpacked', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: true,
    },
    {
      id: '2',
      name: 'iPhone Charger',
      packed: true,
    },
  ];

  const result = reducer(state, markAllAsUnpacked());
  result.forEach((item) => expect(item.packed).toBe(false));
});
