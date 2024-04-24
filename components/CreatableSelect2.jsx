'use client'
import { useState } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';

export function CreatableSelect2({ posts, postTag, uniqueTags, whenChanged }) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [search, setSearch] = useState('');
    const [data, setData] = useState(uniqueTags);
    const [value, setValue] = useState(null);


    const filteredOptions = data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
    );

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));


    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                if (val === '$create') {
                    whenChanged(search);
                    setData((current) => [...current, search]);
                    setValue(search);
                } else {
                    whenChanged(val);
                    setValue(val);
                    setSearch(val);
                }

                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    rightSection={<Combobox.Chevron />}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    placeholder="Search value"
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
                    {options}
                    {search.trim().length > 0 && (
                        <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
