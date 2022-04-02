test_component() {
    npx jest -o --collectCoverageFrom=src/$1.tsx tests/$1.spec.tsx
    [ $? -ne 0 ] && exit 1
    clear
}

clear

test_component App
