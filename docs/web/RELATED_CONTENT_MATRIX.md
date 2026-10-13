# Funtime Related-Content Matrix

**Observed:** 2026-10-13. “Observed block” means its heading/region appeared in a sampled page snapshot; it does not establish a universal product rule, ranking algorithm, or expected card count. Recommendations and page data can change.

## Matrix

| Page template / representative URL | Location type | Expected block (confirmed requirement?) | Observed block | Expected item count | Link destination validation | Data consistency validation | Test cases | Coverage / uncertainty |
|---|---|---|---|---|---|---|---|---|
| Lake detail `/nature/male-domashnye` | Lake | Not specified by authoritative requirements. Treat observed block as current behavior, not universal mandatory contract. | “Що ще є поруч”; “Інші озера”. Recommendation cards/links present. | Not defined; do not assert fixed count. | Card destinations were visible; exhaustive opening/validation not performed. | No self-link/duplicates/type relevance rule established across the full block. | REL-002, DATA-001 | `PARTIALLY_VERIFIED`; block titles/types observed, selection and every link unverified. |
| River detail `/nature/ikva-river` | River | Not specified by authoritative requirements. | “Що ще є поруч”; “Інші річки”. “Дубенський Замок” was displayed as a recommendation. | Not defined. | “Дубенський Замок” opened `/architecture/dubenskiy`; Back returned to source page. | Destination loaded and corresponded to the displayed castle label. A geographic-proximity rule is not established. | REL-001, REL-002, LOC-001 | `PARTIALLY_VERIFIED`; one recommendation end-to-end validated. |
| Country-complex detail `/relaxation-and-recreation/haiky-rezort` | Country complex | Not specified by authoritative requirements. | “Що ще є поруч”; “Інші заміські комплекси”. | Not defined. | Block links were observed; no full destination walk was recorded. | Type-specific placement observed; exclusion of current item/duplicates not tested. | REL-002 | `PARTIALLY_VERIFIED`; link relevance, self-exclusion and duplicates unverified. |
| Article detail `/articles/dictionary-of-quest-gamers` | Editorial article | No mandatory editorial recommendation rule confirmed. | “Вас також зацікавить” insertion area; no visible cards in captured snapshot. | Not defined; zero visible cards may be valid or transient. | No card destination was available to validate in the snapshot. | Cannot determine whether cards were absent by design, loading, or content availability. | ART-001 | `NEEDS_VERIFICATION`; not a defect absent an expected rule and reproducibility. |
| Lake catalog `/nature/type/lakes` | Type catalog | No detail-page related block requirement applied. | “Дивіться також” with links to other nature types including waterfalls, deserts, caves, trees, quarries, canyons, islands and rivers. | Multiple type links; exact count is content-dependent. | Observed links were internal and had type routes. | Labels appeared aligned with route slugs in the captured snapshot; not every destination opened. | CAT-001, NAV-001 | `PARTIALLY_VERIFIED`; catalog cross-links are distinct from related-place recommendations. |
| Collection detail `/collections/relaxation-and-recreation/parky-z-dynozavrvmy-v-ukrayini` | Collection | Collection membership, not a related-content module. | Eight location cards at inspection time. DinoSofia card opened its place detail. | Eight observed at audit time; not an invariant. | One item (`DinoSofia`) opened `/relaxation-and-recreation/dinosofia-park`. | Item destination matched the displayed item; all other items not individually checked. | NAV-003, DATA-001 | `PARTIALLY_VERIFIED`; not included in related recommendations count. |

## Validation rules for designed tests

1. Validate rendered heading, card label, href, and destination heading independently. A link that loads is not by itself proof that its destination matches the card label.
2. Do not assert proximity, tag matching, category eligibility, recommendation ordering, fixed counts, or “no self-recommendation” as product requirements until confirmed by product requirements or controlled repeated observations.
3. Keep current-page exclusion and duplicate-card checks as candidate validation scenarios under `REL-002`; they are not established failures or confirmed requirements yet.
4. For a template where no related items are visible, record the state and verify whether it is expected before filing a defect.
5. The same-place-type blocks (“Інші озера”, “Інші річки”, “Інші заміські комплекси”) appear conditional on type in the sampled examples; broader applicability remains unverified.

## Test-case references

- `REL-001`: river recommendation navigation and Back behavior.
- `REL-002`: compare observed block types across lake, river and country-complex templates; verify card labels against destination headings without asserting an unknown selection algorithm.
- `DATA-001`: cross-template card label/URL/destination consistency.
- `ART-001`: editorial internal link; it does not assume that the empty “Вас також зацікавить” area must contain cards.

No related-content defect was confirmed during the read-only audit. For open questions see [FUNCTIONAL_DEFECTS.md](FUNCTIONAL_DEFECTS.md).
