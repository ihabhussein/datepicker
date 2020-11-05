# datepicker

A simple and lightweight javascript date picker with no dependencies

## Installation

Just include the file `datepicker.js`. The script has no dependencies.

## Usage

Add the class name `datepicker` to the input elements:

    <input type="date" class="datepicker">

The date picker detects the browser's support of the date input type, and is
displayed in browsers that lack support (e.g., IE, Edge, desktop Safari) in
addition to Firefox which supports the date input type but lacks a native date
picker UI.

The date picker uses the browser's localization to match the document it is in.
Example `html` tag:

    <html lang="ar-EG" dir="rtl" data-startofweek="6">

The optional `data-startofweek` attribute gives the desired first day of the week in the
date picker. Sunday is 0, Monday is 1, &hellip;, etc. By default the first day
of the week is Sunday.

## Styling

Out of the box, the date picker is intentionally not styled. Styling is left
entirely to the page author to match the overall page appearance. Check the
supplied example files for ideas.

## License

The code is released under the BSD 2-clause license. It can be freely used,
modified, and distributed.
