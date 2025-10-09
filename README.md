# MultiSearch_MAP

## Project Summary

When I was researching Australian visa information, I realized how tedious it was to search for each region separately. That’s why I created this simple map tool — to visualize multiple cities at once.

This project was developed out of that specific need: **to quickly fetch and visualize the boundary information for a batch of cities in a single process.**

## Technical Notes & Limitations

* **Goal:** To simplify the data lookup process from a multi-step chore into a single-action query.
* **Data Source:** This tool utilizes **OpenStreetMap Nominatim APIs**.
* **Current Status:** Due to the inherent limitations and incomplete nature of the open data sources, not all city boundaries (e.g., in the Australian context) are fully available. However, the tool is robust and effective for querying multiple cities, specifically demonstrating its capability with **Taiwanese city data**.
* **Live Demo:** See the application in action here: [MultiSearch_MAP](multisearch-map-120f3.firebaseapp.com)

---

## License & Contribution

This project is released under the **GNU Affero General Public License v3.0 (AGPLv3)**.

* **Contribution:** Pull requests are welcome! Feel free to help us improve data integrity, add new region support, or optimize the query logic.
* **Disclaimer:** This software is provided "as is" and **without any warranty**. The developer is not liable for any issues arising from its use. Please refer to the `LICENSE` file for full terms and conditions.
