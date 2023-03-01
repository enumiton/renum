import type { HTMLAttributes, LiHTMLAttributes, ReactElement, UIEvent } from 'react';

type ListboxValue = string /*| ReadonlyArray<string>*/ | number | undefined;
type ListboxChangeHandler = ((value: ListboxValue, e: UIEvent<HTMLElement>) => void);

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

type Base = Omit<HTMLAttributes<HTMLUListElement>, 'role' | 'onChange' | 'aria-disabled'>;

interface ListboxProps extends Omit<Base, 'defaultValue' | 'children'>, SharedProps {
	readonly value?: ListboxValue;
	readonly defaultValue?: ListboxValue;
	readonly options: (ListboxOption | ListboxOptionGroup)[];
	/** @default false */
	readonly multiSelectable?: boolean | undefined;
	readonly disabled?: boolean | undefined;
}

type InternalListboxProps = Omit<ListboxProps, 'defaultValue'>;

interface OptionProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'onChange' | 'value'>, ListboxOption, SharedProps {
	readonly isSelected?: boolean | undefined;
}

interface GroupProps extends Base, ListboxOptionGroup, SharedProps {
	readonly selected?: ListboxValue;
	readonly options: ListboxOption[];
	readonly disabled?: boolean | undefined;
}

export type {
	ListboxProps,
	InternalListboxProps,
	OptionProps,
	GroupProps,
	ListboxOption,
	ListboxOptionGroup,
	ListboxValue,
};
