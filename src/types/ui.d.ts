import { IFocusable } from './form';
import {
	IContainer,
	IDestructible,
	IDictionary, IViewComponent,
	Nullable
} from './types';
import { Buttons } from './toolbar';
import { IViewBased } from './view';

export interface IUIElement extends IViewComponent, IContainer, IDestructible {
	parentElement: Nullable<IUIElement>;

	closest<T extends Function>(type: T | IUIElement): Nullable<IUIElement>;

	update(): void;
	updateParentElement(target: IUIElement): this;
	appendTo(element: HTMLElement): this;

	mods: IDictionary<string | boolean | null>;
	setMod(name: string, value: string | boolean | null): this;
}

export interface IUIButtonState {
	size: 'tiny' | 'xsmall' | 'small' | 'middle' | 'large';
	name: string;
	status: string;
	disabled: boolean;
	activated: boolean;

	icon: {
		name: string;
		iconURL: string;
		fill: string;
	};

	text: string;
	tooltip: string;

	tabIndex: number;
}

export interface IUIButtonStatePartial {
	size?: IUIButtonState['size'];
	disabled?: boolean;
	activated?: boolean;
	icon?: {
		name: string;
		fill?: string;
	};
	text?: string;
	tooltip?: string;
}

export interface IUIButton extends IViewComponent, IUIElement, IFocusable {
	state: IUIButtonState;

	setState(state: IUIButtonStatePartial): this;

	text: HTMLElement;
	icon: HTMLElement;

	isButton: true;

	onAction(callback: (event: MouseEvent) => void): this;
}

export interface IUIGroup extends IUIElement {
	elements: IUIElement[];
	append(elm: IUIElement): void;
	clear(): void;
}

export interface IUIList extends IUIGroup {
	jodit: IViewBased;

	mode: 'vertical' | 'horizontal';
	buttonSize: IUIButtonState['size'];

	buttons: IUIButton[];
	getButtonsNames(): string[];

	removeButtons: string[];
	setRemoveButtons(removeButtons?: string[]): this;

	build(
		items: Buttons | IDictionary<string>,
		target?: Nullable<HTMLElement>
	): IUIList;
}
