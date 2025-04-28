import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DragableContainer from '../src/components/DragableContainer';
import { Text } from 'react-native';

// Mock the onSelect and onDelete functions
const mockOnSelect = jest.fn();
const mockOnDelete = jest.fn();

describe('DragableContainer', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <DragableContainer
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
      </DragableContainer>
    );

    // Check if the child component is rendered
    expect(getByTestId('child')).toBeTruthy();
  });

  it('calls onSelect when pressed', () => {
    const { getByText } = render(
      <DragableContainer
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
        <Text>Child Component</Text>
      </DragableContainer>
    );

    // Simulate a press event
    fireEvent.press(getByText('Child Component'));

    // Check if onSelect was called
    expect(mockOnSelect).toHaveBeenCalledWith(0);
  });

  it('calls onDelete when delete button is pressed', () => {
    const { getByTestId } = render(
      <DragableContainer
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
        <Text>Child Component</Text>
      </DragableContainer>
    );

    // Simulate a press event on the delete button
    fireEvent.press(getByTestId('deleteButton'));

    // Check if onDelete was called
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
