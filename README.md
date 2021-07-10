# cypress-forms-commands

**cypress-forms-commands** is a set of commands destined to simplify form filling and validation.

It provides two main functions:

* **Form filling**
* **Form validation**

## Form Filling

The fillForm commands has two versions: `fillForm` and `fillFormFromMap`.

#### fillForm

`fillForm` is the simpler version. It takes the object being passed to it, and tries to match the object keys with elements that have a matching attribute.

By default, this attribute is `cy-f`, but this attribute can be changed through the `cypress.json` file like so:

```json
// cypress.json
{
  "env": {
    "formscommands_handle_attribute": "my-new-attribute"
  }
}
```

The command will detect automatically the input type of the field so it can appropriately fill the information being passed to it.

Note that for select, checkboxes and radio buttons, the name of the option **value attribute** must also **match the value** passed for each key.

**Here is an example of a simple form being filled with the `fillForm` command:**

```html
<!-- index.html -->
<form>
  <label>Username:</label><input type="text" cy-f="username">
  <label>Complete Name:</label><input type="text" cy-f="completeName">
  <label>Age:</label><input type="number" cy-f="age">
  <label>
    City:
  </label>
  <select cy-f="city">
    <option value="">--Please choose a city--</option>
    <option value="calgary">Calgary</option>
    <option value="montreal">Montreal</option>
    <option value="toronto">Toronto</option>
  </select>
  <label>Interests:</label>
  <div>
    <label><input type="checkbox" cy-f="interest" name="interests" value="climbing">Climbing</label>
    <label><input type="checkbox" cy-f="interest" name="interests" value="coding">Coding</label>
    <label><input type="checkbox" cy-f="interest" name="interests" value="cycling">Cycling</label>
    <label><input type="checkbox" cy-f="interest" name="interests" value="gaming">Gaming</label>
  </div>
  <label>Prefered mean of transportation:</label>
  <div>
    <label><input type="radio" cy-f="transport" name="transport" value="bike">Bike</label><label><input type="radio" cy-f="transport" name="transport" value="public-transport">Public transport</label>
    <label><input type="radio" cy-f="transport" name="transport" value="car">Car</label>
  </div>
</form>
```

```js
// spec.ts
cy.fillForm({
  username: 'TestsSlayer',
  completeName: 'John Simpleman',
  age: 34,
  city: 'montreal',
  interests: [
    'coding',
    'climbing',
  ],
  transport: 'public-transport',
})
```

**Result in cypress:**

![asd](./docs/demo.gif)
