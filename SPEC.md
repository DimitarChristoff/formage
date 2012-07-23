# Form builder

A form is specified in a JSON format, in order to make it easy to maintain, and
easy to share between front/backend, especially with regards to validation.

Formal builds upon concepts of groups. Even if your form has only a single
group, it will still expect that group to be specified.

A sample formal spec would look like this:

```json
[{
	"type": "main",
	"title": "Group title",
	"elements": [{
		"type": "text",
		"name": "firstName"
	}, {
		"type": "text",
		"name": "lastName"
	}]
}]
```

## Opinionated? Maybe a little...

Formal will make some assumptions about your forms. For example, when a field
does not have an id, it will automatically generate an id using the name if
possible and using a numeric index if no name was provided.

## Groups

Each form is divided into groups, which in turn hold various elements.

## Fields

Within each group, there's an `elements` property. This holds the description
for each field being used. Below you'll find a list of all field types, and how
they are built up.

### Options

These options are generic for all field types

- type: Defines what field type you desire
- id: Id of the field (useful for javascript hooks)
- name: Name of the field. This will be important for your server-side code
- defaultValue: Default value to put into the field
- attributes: An object with key/value pairs for html attributes. Useful for
	setting placeholders

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

Sometimes, cases arise where you want to be able to show an extra section of a
form based on filled in values; to do this, we have a mechanism called
dependancy groups.

In any given form definition you can add a key called `dependancies`, which
takes an object containing more group/field specifications as it's value.

```json
{
	"dependancies": {
		"value to trigger on": [{
			"type": "inline",
			"elements": [{
				"type": "text",
				...
			}, {
				"type": "select".
				...
			}]
		}]
	}
}
```

The type of field this dependancy is linked to will determine how it's
triggered. If it's a text field, for example, the dependancy will render if the
user types in "value to trigger on" and then blurs from the field.

For a select box, it'll trigger when the user selects a certain key in the list.

