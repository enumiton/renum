import type { HTMLAttributes, LiHTMLAttributes, ReactElement } from 'react';

type ListboxValue = string | ReadonlyArray<string> | number | undefined;
type ListboxChangeHandler = ((value: ListboxValue) => void);

type Base = Omit<HTMLAttributes<HTMLUListElement>, 'onChange'>;

interface ListboxOption {
	readonly value: ListboxValue;
	readonly label: string | number | ReactElement;
	readonly disabled?: boolean | undefined;
}

interface ListboxOptionGroup {
	readonly label: string | number | ReactElement;
	readonly disabled?: boolean | undefined;
	readonly options: ListboxOption[];
}

interface SharedProps {
	readonly onChange?: ListboxChangeHandler | undefined;
}

interface ListboxProps extends Omit<Base, 'onChange' | 'children'>, SharedProps {
	readonly options: (ListboxOption | ListboxOptionGroup)[];
}

interface OptionProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'onChange' | 'value'>, ListboxOption, SharedProps {
	readonly isSelected?: boolean | undefined;
}

interface GroupProps extends Base, ListboxOptionGroup, SharedProps {
	readonly selected?: ListboxValue;
	readonly options: ListboxOption[];
}

export type { ListboxProps, OptionProps, GroupProps, ListboxOption, ListboxOptionGroup, ListboxValue };
