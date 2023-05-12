---
sidebar_position: 2
---

# Usage

`@arkejs/table` can be used in two different ways, based on your needs.

---

### Basic Usage

The basic implementation allows you to display data without having any sort of control over pagination, filtering and more.

```jsx
<Table data={data} columns={columns} />
```

Please refer to `Table` Api Reference in order to have more information about the available props.

---

### Advanced Usage

Advanced use cases which includes filtering, pagination and more can be achieved by using `useTable` hook.
The `useTable` hook provides several functionalities for managing the table in a *headless* way.

Let's dive into this example:

```jsx
function MyTable() {
    const {tableProps, goToPage, currentPage, pageCount} = useTable({
        pagination: {
            totalCount: 100,
            pageSize
        },
    });

    return <Table {...tableProps} data={data}/>
}
```

As you can see by using `useTable` we don't need to define props for the `Table` component since they are returned in `tableProps`.
In addition, the hook provides us some ways to manage the table externally.

Let's now implement a simple pagination, fully controlled by outside.

```jsx
function MyTable() {
    const {tableProps, goToPage, currentPage, pageCount} = useTable({
        pagination: {
            totalCount: 100,
            pageSize
        },
    });

    return (
        <>
            <Table {...tableProps} data={data}/>
            <button
                disabled={currentPage == 0}
                onClick={() => {
                    goToPage(currentPage - 1);
                }}
            >
                {"<"}
            </button>
            <button
                disabled={currentPage == pageCount - 1}
                onClick={() => {
                    goToPage(currentPage + 1);
                }}
            >
                {">"}
            </button>
        </>
    );
}
```

By using `useTable` exported function we ended up with a `Table` which pagination is managed in the way that we like.

Please refer to `useTable` Api Reference for more info about the usage.
