import { useCombobox } from 'downshift';
import debounce from 'lodash.debounce';
import React, { forwardRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cx from 'classnames';
import Input from '@/components/core/input/Input';
import { Recipe } from '@/utils/types/Recipe';
import styles from '@/components/recipes/recipesSearchBar/RecipesSearchBar.module.scss';
import { apiClient } from '@/api/apiClient';

type RecipesSearchBarProps = UseFormRegisterReturn;

const RecipesSearchBar = forwardRef<HTMLInputElement, RecipesSearchBarProps>(
  ({ onChange, onBlur, name }, ref) => {
    const [matchingRecipes, setMatchingRecipes] = useState<Array<Recipe>>([]);

    const getMatchingRecipes = debounce(async ({ inputValue }) => {
      if (!inputValue) {
        setMatchingRecipes([]);
        return;
      }
      const response = await apiClient.get(
        `/recipes?take=4&skip=0&name=${inputValue}`,
      );
      setMatchingRecipes(response.data.data);
    }, 500);

    const {
      isOpen,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      getItemProps,
      closeMenu,
    } = useCombobox({
      items: matchingRecipes,
      onInputValueChange: getMatchingRecipes,
    });

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === `Enter`) {
        closeMenu();
      }
    };

    return (
      <div className={styles.searchWrapper} {...getComboboxProps()}>
        <Input
          autocomplete={false}
          variant="white"
          radius={5}
          type="text"
          placeholder="Search recipe by name"
          onKeyPress={handleKeyPress}
          {...getInputProps({
            ref,
            onChange,
            onBlur,
            name,
          })}
        />
        <ul
          className={cx(
            styles.searchResults,
            isOpen && matchingRecipes.length && styles.searchResultsVisible,
          )}
          aria-label="results"
          {...getMenuProps()}
        >
          {isOpen &&
            matchingRecipes.map((item, index) => (
              <li
                className={styles.searchResultsItem}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    );
  },
);

export default RecipesSearchBar;