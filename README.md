# @arkejs/table

![Table](https://user-images.githubusercontent.com/81776297/233088195-b7781154-e5da-4a6c-bc27-25ae73d6f49c.png)

[![License](https://img.shields.io/badge/license-Apache2.0-blue.svg)](https://github.com/arkemishub/arke-monorepo/blob/master/LICENSE.txt)


## Documentation

For full documentation, visit [https://arkemishub.github.io/table/](https://arkemishub.github.io/table/)

## Install

How to install `@arkejs/table`?

Install `@arkejs/table`
```shell
npm i @arkejs/table
```


## Usage

`@arkejs/table` can be used in two different ways, based on your needs.

---

### Basic Usage

The basic implementation allows you to display data without having any sort of control over pagination, filtering and more.

```jsx
<Table data={data} columns={columns} />
```

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


### How versioning with changesets

The @arkejs/ui use [changeset](https://github.com/changesets/changesets) to versioning changes.

After your commits run `npx changeset`, it will ask if you want to use a patch/minor/major a summary for your changes.

Completed the process will be created a `.md` file under `.changeset` folder, commit it to create your PR.
