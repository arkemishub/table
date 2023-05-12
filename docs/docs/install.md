---
sidebar_position: 1
---

# Install

How to install `@arkejs/table`?

Install `@arkejs/table`
```shell
npm i @arkejs/table
```


### Using Tailwind CSS?

If you're using Tailwind CSS remember to add this line to your `tailwind.config.js`
   ```js title='tailwind.config.js'
     module.exports = {
        // rest of config
        content: [
           './node_modules/@arkejs/table/dist/**/*.{js,ts,jsx,tsx}',
        ]
     }
   ```
