/**
 * External dependencies
 */
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Button from '../button';
import { Flex } from '../flex';
import AllInputControl from './all-input-control';
import InputControls from './input-controls';
import BoxControlIcon from './icon';
import Text from '../text';
import LinkedButton from './linked-button';
import Visualizer from './visualizer';
import {
	Root,
	Header,
	HeaderControlWrapper,
} from './styles/box-control-styles';
import { useControlledState } from '../utils/hooks';

const defaultInputProps = {
	min: 0,
};

function useUniqueId( idProp ) {
	const instanceId = useInstanceId( BoxControl );
	const id = `inspector-box-control-${ instanceId }`;

	return idProp || id;
}
export default function BoxControl( {
	id: idProp,
	inputProps = defaultInputProps,
	onChange = noop,
	label = __( 'Box Control' ),
	values: valuesProp,
	units,
} ) {
	const [ isLinked, setIsLinked ] = useState( true );
	const [ side, setSide ] = useState( isLinked ? 'all' : 'top' );
	const [ isDirty, setIsDirty ] = useState( false );
	const [ values, setValues ] = useControlledState( valuesProp );

	const initialValuesRef = useRef( valuesProp );

	const id = useUniqueId( idProp );
	const headingId = `${ id }-heading`;

	const toggleLinked = () => {
		setIsLinked( ! isLinked );
		setSide( ! isLinked ? 'all' : 'top' );
	};

	const handleOnFocus = ( event, { side: nextSide } ) => {
		setSide( nextSide );
	};

	const handleOnChange = ( nextValues ) => {
		onChange( nextValues );
		setValues( nextValues );
		setIsDirty( true );
	};

	const handleOnReset = () => {
		const initialValues = initialValuesRef.current;

		onChange( initialValues );
		setValues( initialValues );
		setIsDirty( false );
	};

	const inputControlProps = {
		...inputProps,
		onChange: handleOnChange,
		onFocus: handleOnFocus,
		isLinked,
		units,
		values,
	};

	return (
		<Root id={ id } role="region" aria-labelledby={ headingId }>
			<Header className="component-box-control__header">
				<Flex.Item>
					<Text
						id={ headingId }
						className="component-box-control__label"
					>
						{ label }
					</Text>
				</Flex.Item>
				<Flex.Item>
					<Button
						className="component-box-control__reset-button"
						isSecondary
						isSmall
						onClick={ handleOnReset }
						disabled={ ! isDirty }
					>
						Reset
					</Button>
				</Flex.Item>
			</Header>
			<HeaderControlWrapper className="component-box-control__header-control-wrapper">
				<Flex.Item>
					<BoxControlIcon sides={ [ side ] } />
				</Flex.Item>
				{ isLinked && (
					<Flex.Block>
						<AllInputControl { ...inputControlProps } />
					</Flex.Block>
				) }
				<Flex.Item>
					<LinkedButton
						onClick={ toggleLinked }
						isLinked={ isLinked }
					/>
				</Flex.Item>
			</HeaderControlWrapper>
			<InputControls { ...inputControlProps } />
		</Root>
	);
}

BoxControl.__Visualizer = Visualizer;
