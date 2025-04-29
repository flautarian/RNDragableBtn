import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DraggableContainer } from '../src/components/DraggableContainer';
import { Text } from 'react-native';

// Mock the onSelect and onDelete functions
const mockOnSelect = jest.fn();
const mockOnDelete = jest.fn();

describe('DragableContainer', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <DraggableContainer
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        selected={false}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      >
        <Text testID="child">Child Component</Text>
      </DraggableContainer>
    );

    // Check if the child component is rendered
    expect(getByTestId('child')).toBeTruthy();
  });

  it('calls onSelect when pressed', () => {
    const { getByText } = render(
      <DraggableContainer
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        selected={false}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    // Simulate a press event
    fireEvent.press(getByText('Test'));

    // Check if onSelect was called
    expect(mockOnSelect).toHaveBeenCalledWith(0);
  });

  it('calls onDelete when delete button is pressed', () => {
    const { getByTestId } = render(
      <DraggableContainer
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        selected={true}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    // Simulate a press event on the delete button
    fireEvent.press(getByTestId('deleteButton'));

    // Check if onDelete was called
    expect(mockOnDelete).toHaveBeenCalled();
  });

  test('check if delete button has visibility hidden when onDelete is not provided', () => {
    const { getByTestId } = render(
      <DraggableContainer
        selected={true}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        onSelect={mockOnSelect}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const deleteButton = getByTestId('deleteButton');

    // Check if the Pressable component has the style visibility: visible
    expect(deleteButton).toHaveStyle({ visibility: 'hidden' });
  });

  test('check if delete button is visible when onDelete is provided', () => {
    const { getByTestId } = render(
      <DraggableContainer
        selected={true}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const deleteButton = getByTestId('deleteButton');

    // Check if the Pressable component has the style visibility: visible
    expect(deleteButton).toHaveStyle({ visibility: 'visible' });
  });

  test('check if move button is hidden when draggable is false', () => {
    const { queryByTestId } = render(
      <DraggableContainer
        selected={false}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        draggable={false}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const moveButton = queryByTestId('moveButton');

    expect(moveButton).toBeNull();
  });

  test('check if move button is visible when draggable is true', () => {
    const { queryByTestId } = render(
      <DraggableContainer
        selected={true}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        draggable={true}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const moveButton = queryByTestId('moveButton');

    expect(moveButton).not.toBeNull();
  });

  test('check if rotate button is visible when rotable is true', () => {
    const { getByTestId } = render(
      <DraggableContainer
        selected={true}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        rotable={true}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const rotateButton = getByTestId('rotateButton');

    // Check if the Pressable component has the style visibility: visible
    expect(rotateButton).toHaveStyle({ visibility: 'visible' });
  });

  test('check if rotate button is hidden when rotable is false', () => {
    const { getByTestId } = render(
      <DraggableContainer
        selected={true}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        rotable={false}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const rotateButton = getByTestId('rotateButton');

    // Check if the Pressable component has the style visibility: visible
    expect(rotateButton).toHaveStyle({ visibility: 'hidden' });
  });

  test('check if one square resizable button is visible when resize is true', () => {
    const { getByTestId } = render(
      <DraggableContainer
        selected={true}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        resizable={true}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const oneSquareResizeButton = getByTestId('resizableButton-1-square');

    // Check if the Pressable component has the style visibility: visible
    expect(oneSquareResizeButton).toHaveStyle({ visibility: 'visible' });
  });

  test('check if one square resizable button is hidden when resize is false', () => {
    const { getByTestId } = render(
      <DraggableContainer
        selected={true}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="1-square"
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        resizable={false}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const oneSquareResizeButton = getByTestId('resizableButton-1-square');

    // Check if the Pressable component has the style visibility: visible
    expect(oneSquareResizeButton).toHaveStyle({ visibility: 'hidden' });
  });

  test('check if four square resizable button is visible when resizable is true', () => {
    const { getByTestId } = render(
      <DraggableContainer
        selected={true}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="4-squares"
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        resizable={true}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const xfSquareResizeButton = getByTestId("resizableButton-xf-square");
    const ySquareResizeButton = getByTestId("resizableButton-y-square");
    const xSquareResizeButton = getByTestId("resizableButton-x-square");
    const yfSquareResizeButton = getByTestId("resizableButton-yf-square");

    // Check if the Pressable component has the style visibility: visible
    expect(xfSquareResizeButton).toHaveStyle({ visibility: 'visible' });
    expect(ySquareResizeButton).toHaveStyle({ visibility: 'visible' });
    expect(xSquareResizeButton).toHaveStyle({ visibility: 'visible' });
    expect(yfSquareResizeButton).toHaveStyle({ visibility: 'visible' });
  });

  test('check if four square resizable button is hidden when resizable is false', () => {
    const { getByTestId } = render(
      <DraggableContainer
        selected={true}
        x={0}
        y={0}
        height={100}
        width={100}
        rotation={0}
        resizeMode="4-squares"
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
        resizable={false}
      >
        <Text> Test </Text>
      </DraggableContainer>
    );

    const xfSquareResizeButton = getByTestId("resizableButton-xf-square");
    const ySquareResizeButton = getByTestId("resizableButton-y-square");
    const xSquareResizeButton = getByTestId("resizableButton-x-square");
    const yfSquareResizeButton = getByTestId("resizableButton-yf-square");

    // Check if the Pressable component has the style visibility: visible
    expect(xfSquareResizeButton).toHaveStyle({ visibility: 'hidden' });
    expect(ySquareResizeButton).toHaveStyle({ visibility: 'hidden' });
    expect(xSquareResizeButton).toHaveStyle({ visibility: 'hidden' });
    expect(yfSquareResizeButton).toHaveStyle({ visibility: 'hidden' });
  });

});
