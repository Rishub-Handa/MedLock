import { createStore, applyMiddleware, compose } from 'redux'; 
import { composeWithDevTools } from 'redux-devtools-extension'; 
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise-middleware';
import rootReducer from './reducers/rootReducer';

const initialState = {
    user: {
        name: 'John',
        bio: "Born and raised in Alabama. 40 years old."
    },
    editable: false,
    profileModules: [
        {
            question: "Question",
            answer: "Answer"

        }
    ]
};

const middleware = [thunk, reduxPromise];

const store = createStore(
    rootReducer,
    initialState,
    // compose(
    //     applyMiddleware(...middleware),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
    composeWithDevTools(
        applyMiddleware(...middleware),
    )
);

export default store;