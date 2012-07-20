# Form builder

A form is specified in a JSON format, in order to make it easy to maintain, and
easy to share between front/backend, especially with regards to validation.

## Groups

Each form is divided into groups, which in turn hold various elements. More info
about groups coming soon.

## Fields

Within each group, there's an `elements` property. This holds the description
for each field being used. Below you'll find a list of all field types, and how
they are built up.

### Regular field

Example field specification:

```json
{
	"type": "text",
	"id": "firstName",
	"name": "firstName",
	"defaultValue": ""
}
```

### Select box

Example field specification:

```json
{
	"type": "select",
	"id": "firstName",
	"name": "firstName",
	"multiple": false,
	"options": {
		"key1": "value1",
		"key2": "value2"
	},
	"defaultValue": "key1"
}
```

#### Special cases

- **Multiple-value select boxes:** If you have `multiple: true` specified,
	`defaultValue` can also be specified as an array of keys.
- `defaultValue` can also be false -- or omitted entirely -- if an empty
	starting value is desired at the top of the select box.

### Radio boxes

Example field specification:

```json
{
	"type": "radio",
	"id": "firstName",
	"name": "firstName",
	"options": {
		"key1": "value1",
		"key2": "value2"
	},
	"defaultValue": "key1"
}
```

### Checkboxes

Example field specification:

```json
{
	"type": "checkbox",
	"id": "firstName",
	"name": "firstName",
	"options": {
		"key1": "value1",
		"key2": "value2"
	},
	"defaultValue": "key1"
}
```

- `defaultValue` may also be an array of keys to be selected by default.

## Dependancies

Sometimes, cases arrise where you want to be able to show an extra section of a
form based on filled in values; to do this, we have a mechanism called
dependancy groups.

In any given form definition you can add a key called `dependancies`, which
takes an object containing more field specifications as it's value.

```json
{
	"dependancies": {
		"value to trigger on": {
			"type": "inline",
			"elements": [{
				"type": "text",
				...
			}, {
				"type": "select".
				...
			}]
		}
	}
}
```

The type of field this dependancy is linked to will determine how it's
triggered. If it's a text field, for example, the dependancy will render if the
user types in "value to trigger on" and then blurs from the field.

For a select box, it'll trigger when the user selects a certain key in the list.

