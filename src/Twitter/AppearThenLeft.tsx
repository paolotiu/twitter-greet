/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

interface Props<TagName extends React.ElementType = React.ElementType> {
	children?: React.ReactNode;
	text?: string;
	order: number;
	withSpace?: boolean;
	as?: TagName;
}

export type AppearThenLeftProps<E extends React.ElementType> = Props<E> &
	Omit<React.ComponentProps<E>, keyof Props>;

const AppearThenLeft = <TagName extends React.ElementType<any> = 'span'>({
	children,
	order,
	text,
	withSpace,
	as,
	...rest
}: AppearThenLeftProps<TagName>) => {
	const delay = order * 5;
	const frame = useCurrentFrame();

	const right = interpolate(frame, [0 + delay, 4 + delay], [8, 0], {
		extrapolateRight: 'clamp',
	});
	const o = interpolate(frame, [0 + delay, 1 + delay], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const Tag = as || 'span';
	return (
		<Tag
			{...rest}
			style={{
				transform: `translateX(${right}px)`,
				opacity: o,
				display: 'inline-block',
				...rest.style,
			}}
		>
			{text}
			{children}
			{withSpace && <span>&nbsp;</span>}
		</Tag>
	);
};

export default AppearThenLeft;
