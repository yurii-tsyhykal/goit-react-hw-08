import { createSelector, createSlice } from '@reduxjs/toolkit';
import { deleteContact, fetchContacts, addContact } from '../contactsOps';
import { selectNameFilter } from '../filtersSlice/filtersSlice';

const INITIAL_STATE = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
  filters: {
    name: '',
  },
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.loading = false;
        state.contacts.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.contacts.loading = false;
        state.contacts.error = payload;
      })
      .addCase(addContact.pending, state => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.loading = false;
        state.contacts.items.push(payload);
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.contacts.loading = false;
        state.contacts.error = payload;
      })
      .addCase(deleteContact.pending, state => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts.loading = false;
        state.contacts.items = state.contacts.items.filter(
          item => item.id != payload.id
        );
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.contacts.loading = false;
        state.contacts.error = payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export const selectContacts = state => state.contacts.contacts.items;
export const selectIsLoading = state => state.contacts.contacts.loading;
export const selectIsError = state => state.contacts.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
);
