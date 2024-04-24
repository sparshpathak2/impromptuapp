'use client'

import { useState, useEffect } from 'react';
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

export function FiltersMultiSelect({ uniqueTags, postTags, filterTags, setFilterTags, uniqueTagsState }) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [search, setSearch] = useState('');
    // const [data, setData] = useState(uniqueTags);
    const [data, setData] = useState(uniqueTagsState);
    const [value, setValue] = useState([]);

    // useEffect(() => {
    //     setData(uniqueTags);
    //   }, [uniqueTags]);

      useEffect(() => {
        setData(uniqueTagsState);
      }, [uniqueTagsState]);
    

    const handleValueSelect = (val) => {
        setValue((current) =>
            current.includes(val) ? current.filter((v) => v !== val) : [...current, val])

            setFilterTags((currentTags) =>
            currentTags.includes(val) ? currentTags.filter((v) => v !== val) : [...currentTags, val]
        );
    }
    
    const handleValueRemove = (val) => {
        setValue((current) => current.filter((v) => v !== val)); 
        setFilterTags((currentTags) => currentTags.filter((v) => v !== val));  
    }

    const values = value?.map((item) => (
        <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
            {item}
        </Pill>
    ));


    const options = data
        ? data
            .filter((item) => item?.toLowerCase().includes(search.trim().toLowerCase()))
            .map((item) => (
                <Combobox.Option value={item} key={item} active={value?.includes(item)}>
                    <Group justify='space-between'>
                        <span>{item}</span>
                        {value?.includes(item) ? <CheckIcon size={12} /> : null}
                    </Group>
                </Combobox.Option>
            )) : null;

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <PillsInput onClick={() => combobox.openDropdown()} radius='xl' size='xs'>
                    <Pill.Group>
                        {values}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                onFocus={() => combobox.openDropdown()}
                                onBlur={() => combobox.closeDropdown()}
                                value={search}
                                placeholder="Search values"
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
                <Combobox.Options>
                    {options?.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}