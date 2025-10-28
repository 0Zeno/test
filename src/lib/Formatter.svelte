<script lang="ts">
  import { t } from "$lib/translations.js";
  import { MessageFormat } from "messageformat";
  import { partsToTree, type TreeNode } from "./partsToTree.js";

  const { id, props } = $props();

  const trans = $derived($t(id, props));
  const mf = $derived(trans.value && trans.value.trim() ? new MessageFormat(trans.value, trans.locale) : null);
  

  const translation = $derived(mf ? mf.formatToParts(props || {}) : []);
  const tree = $derived(partsToTree(translation));
  
</script>

{#snippet renderNode(node: TreeNode)}
  {#if node.type === "text"}
    {node.value}
  {:else if node.type === "number"}
    {node.value}
  {:else if node.type === "bidi"}
    <span dir="auto">{node.value}</span>
  {:else if node.type === "markup"}
    {#if node.tag === "bold"}
      <b
        >{#each node.children as child}{@render renderNode(child)}{/each}</b
      >
    {:else if node.tag === "italic"}
      <i
        >{#each node.children as child}{@render renderNode(child)}{/each}</i
      >
    {:else if node.tag === "link"}
      {#if node.attributes.to}
        <a href={node.attributes.to}
          >{#each node.children as child}{@render renderNode(child)}{/each}</a
        >
      {:else}
        <!-- svelte-ignore a11y_missing_attribute -->
        <a style="text-decoration: underline"
          >{#each node.children as child}{@render renderNode(child)}{/each}</a
        >
      {/if}
    {:else if node.tag === "error"}
      <span style="color: red"
        >{#each node.children as child}{@render renderNode(child)}{/each}</span
      >
    {:else if node.tag === "star-icon"}
      ⭐
    {:else}
      <span
        >{#each node.children as child}{@render renderNode(child)}{/each}</span
      >
    {/if}
  {/if}
{/snippet}

{#if trans.value}
  {#each tree as node}
    {@render renderNode(node)}
  {/each}
{:else}
  <!-- Show the key as fallback -->
  <span style="color: orange;">[{id}]</span>
{/if}