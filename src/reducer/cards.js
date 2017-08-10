let initialState = {}

export default (state=initialState, action) => {
  let { type, payload } = action;

  switch(type) {

//NOTE: every category has multiple cards
//when we create a category, return a property on state that is the category's id, and initialize it with an empty array as its value (we can store cards for that category here)
    case 'CATEGORY_CREATE':
      return { ...state, [payload.id]: [] }

//if the category is deleted, we set the value to undefined to overwrite the array and its innards (all the created cards that were saved to that state property)
    case 'CATEGORY_DELETE':
      return { ...state, [payload.id]: undefined }

    case 'CARD_CREATE':
    //create a unique categoryID from the payload so we can figure out which category we want to add the card to
      let { categoryID } = payload;
    //we'll make a copy of that card array
      let boardCards = state[categoryID]
    //we'll overwrite the state of that card's id with the cards array with a new card in it appended to the end of the existing ...categoryCards array.
      return { ...state, [categoryID]: [...categoryCards, payload] }

    default:
      return state;
  }
}
