'use client'

import { useState, useEffect } from 'react';
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';

// const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

export function CreateMultiSelectCreatable({ uniqueTags, setTagsInputValue, tagsInputValue, postTags, placeholder }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [data, setData] = useState(uniqueTags);
  // const [value, setValue] = useState(postTags || []);
  const [value, setValue] = useState([]);


  // console.log(postTags)
  console.log(uniqueTags)
  console.log(tagsInputValue)


  const exactOptionMatch = data.some((item) => item === search);

  // const handleValueSelect = (val) => {
  //   setSearch('');

  //   if (val === '$create') {
  //     setData((current) => [...current, search]);
  //     setValue((current) => [...current, search]);
  //     // whenChanged(search)
  //   } else {
  //     setValue((current) =>
  //       current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
  //     );
  //     // whenChanged(val);
  //   }
  // };

  // Function to handle tag selection
  const handleValueSelect = (val) => {
    setSearch('');

    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      setTagsInputValue((currentTags) => [...currentTags, search]); // Add newly created tag to tagsInputValue
    } else {
      setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
      );
      // if (typeof setTagsInputValue === 'function') {
      //   setTagsInputValue((currentTags) => currentTags.filter((v) => v !== val));
      // }
      // setTagsInputValue((currentTags) => currentTags.includes(val) ? currentTags.filter((v) => v !== val) : [...currentTags, val]); // Add or remove selected tag from tagsInputValue
      setTagsInputValue((currentTags) =>
      currentTags.includes(val) ? currentTags.filter((v) => v !== val) : [...currentTags, val]
    ); 
    }
  };





  // const handleValueRemove = (val) =>
  //   setValue((current) => current.filter((v) => v !== val));


  // Function to handle tag removal
  // const handleValueRemove = (val) => {
  //   setValue((current) => current.filter((v) => v !== val));
  //   setTagsInputValue((currentTags) => currentTags.filter((v) => v !== val)); // Remove tag from tagsInputValue
  // };

//   const handleValueRemove = (val) => {
//     setValue((current) => current.filter((v) => v !== val));
//     setTagsInputValue((currentTags) => {
//         if (Array.isArray(currentTags)) {
//             return currentTags.filter((v) => v !== val);
//         } else {
//             // Handle the case where currentTags is not an array
//             console.error('currentTags is not an array');
//             return currentTags; // or return an appropriate value based on your requirements
//         }
//     });
// };

const handleValueRemove = (val) => {
  setValue((current) => current.filter((v) => v !== val)); 
  setTagsInputValue((currentTags) => currentTags.filter((v) => v !== val));  
}

  // const handleValueRemove = (val) => {
  //   setValue((current) => current.filter((v) => v !== val));
    
  //   if (Array.isArray(currentTags)) {
  //     setTagsInputValue((currentTags) => currentTags.filter((v) => v !== val));
  //   } else {
  //     setTagsInputValue([]);
  //   }
  // };



  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));


  const options = data
    ? data
      .filter((item) => item?.toLowerCase().includes(search.trim().toLowerCase()))
      .map((item) => (
        <Combobox.Option value={item} key={item} active={value.includes(item)}>
          {/* <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group> */}
          <Group justify='space-between'>
            <span>{item}</span>
            {value.includes(item) ? <CheckIcon size={12} /> : null}
          </Group>
        </Combobox.Option>
      )) : null;

  // const options = uniqueTags
  //   ? uniqueTags
  //     .filter((item) => item?.toLowerCase().includes(search.trim().toLowerCase()))
  //     .map((item) => (
  //       <Combobox.Option value={item} key={item} active={value.includes(item)}>
  //         {/* <Group gap="sm">
  //         {value.includes(item) ? <CheckIcon size={12} /> : null}
  //         <span>{item}</span>
  //       </Group> */}
  //         <Group justify='space-between'>
  //           <span>{item}</span>
  //           {value.includes(item) ? <CheckIcon size={12} /> : null}
  //         </Group>
  //       </Combobox.Option>
  //     )) : null;


  // const options = uniqueTags
  // ? uniqueTags
  //     .filter((item) => item?.toLowerCase().includes(search.trim().toLowerCase()))
  //     .map((item) => (
  //       <Combobox.Option value={item} key={item} active={value.includes(item)}>
  //         <Group justify='space-between'>
  //           <span>{item}</span>
  //           {value.includes(item) ? <CheckIcon size={12} /> : null}
  //         </Group>
  //       </Combobox.Option>
  //     ))
  // : search.trim().length > 0 // Check if search is not empty
  // ? [<Combobox.Option value="$create">+ Create {search}</Combobox.Option>] // Render the "Create" option
  // : null; // Otherwise, render nothing


  console.log(tagsInputValue)
  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false} checkIconPosition="right">
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={placeholder}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}

          {search.trim().length === 0 && options.length === 0 && (
            <Combobox.Empty>There are no Tags yet. Type something to create one.</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}