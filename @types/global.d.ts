declare interface PlaygroundConfig {
	readonly title: string;
}

declare interface PlaygroundComponent {
	[key: string]: (() => Element);
}

declare type PlaygroundFile = PlaygroundConfig & PlaygroundComponent;
