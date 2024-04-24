'use client'

import { useState, useEffect } from 'react';
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';

// const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

export function MultiSelectCreatable({ uniqueTags, setTagsInputValue } : { uniqueTags: string[], setTagsInputValue: Function }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);
  // const [data, setData] = useState(uniqueTags);
  const [value, setValue] = useState<string[]>([]);

  console.log(uniqueTags)

  useEffect(() => {
    setData(uniqueTags);
  }, [uniqueTags]);

  console.log(data)

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
  const handleValueSelect = (val: string) => {
    setSearch('');

    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      setTagsInputValue((currentTags: string[]) => [...currentTags, search]); // Add newly created tag to tagsInputValue
    } else {
      setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
      );
      // if (typeof setTagsInputValue === 'function') {
      //   setTagsInputValue((currentTags) => currentTags.filter((v) => v !== val));
      // }
      // setTagsInputValue((currentTags) => currentTags.includes(val) ? currentTags.filter((v) => v !== val) : [...currentTags, val]); // Add or remove selected tag from tagsInputValue
      setTagsInputValue((currentTags: string[]) => currentTags.includes(val) ? currentTags.filter((v) => v !== val) : [...currentTags, val]);
    }
  };





  // const handleValueRemove = (val) =>
  //   setValue((current) => current.filter((v) => v !== val));


  // Function to handle tag removal
  const handleValueRemove = (val) => {
    setValue((current) => current.filter((v) => v !== val));
    setTagsInputValue((currentTags) => currentTags.filter((v) => v !== val)); // Remove tag from tagsInputValue
  };



  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));


  // const options = data
  //   ? data
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

  const options = uniqueTags
    ? uniqueTags
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
                placeholder="Assign Tags"
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

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}