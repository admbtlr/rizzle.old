import { initialState, items } from './items'

const state = {
  items: [
    {
      feed_item_id: 1,
      published_at: 1
    },
    {
      feed_item_id: 2,
      published_at: 2,
      readAt: 5
    },
    {
      feed_item_id: 3,
      published_at: 3,
      keepUnread: true
    }
  ]
}

const action = {
  items: [
    {
      feed_item_id: 2,
      published_at: 2
    },
    {
      feed_item_id: 4,
      published_at: 4
    }
  ]
}

describe('items reducer', () => {
  it('should update the index', () => {
    expect(
      items({}, {
        type: 'ITEMS_UPDATE_CURRENT_INDEX',
        index: 23
      })
    ).toEqual({
      index: 23
    })
  })

  it ('should interleave items correctly', () => {
    expect(
      items({
        ...state,
        index: 1
      }, {
        ...action,
        type: 'ITEMS_FETCH_DATA_SUCCESS'
      })
    ).toEqual({
        items: [
          {
            feed_item_id: 1,
            published_at: 1
          },
          {
            feed_item_id: 3,
            published_at: 3,
            keepUnread: true
          },
          {
            feed_item_id: 4,
            published_at: 4
          }
        ],
        index: 0
      })
  })
})
