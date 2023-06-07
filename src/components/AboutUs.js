import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { isBuild } from '../utilities/constants.js';

function AboutUs() {
	return(
    <div style={{color: "#0f6a8b", margin: 6, textAlign: "left"}}>
        <div style={{textAlign: "left"}}>
        <p style={{fontSize: 19}}><strong>MetaboBiome - Interactive browser for exploring immune gene expression and serum metabolites in mouse models with defined flora</strong></p>
        </div>
        <Box>
        <div style={{marginLeft: 15, marginTop: 20, fontSize: 18, textAlign: "left"}}>
 
        <p>
        Host genetics, microbiome composition and environment collectively contribute to predispositions to common disorders, such as allergy, diabetes, obesity, and cancer. The microbiome is reported to influence hematopoietic development, and the function of immune cell populations through the expression of pathogen recognition receptors. To systematically evaluate the impact of gut microbiome without the use of antibiotics or fecal transfer, we analyzed C57BL/6 mice with defined flora created through mouse embryo transfer. By combining deep transcriptomics, comprehensive full spectrum immunophenotyping, and untargeted serum metabolite profiling, we characterized homeostatic hematopoietic progenitors and their immune cell progeny using a cross-systems multi-omics approach. The MetaboBiome viewer enables interactive exploration of differential serum metabolites (unbiased serum metabolomics) and gene expression (single-cell RNA-Seq) from biological replicate mice with five different defined floras: 
        </p>
 
        <p>
        1) germ-free (GF) mice
        </p>

        <p>
        2) mice with eight bacteria known to alleviate gnotobiotic developmental abnormalities (Altered Schaedler Flora; ASF)
        </p>

        <p>
        3) a complex microbiome community that is free of rodent pathogens (Opportunist Free, OF)
        </p>

        <p>
        4) a complex wild mouse microbiome community reported to induce immune responses similar to humans (WildR)
        </p>

        <p>
        5) a complex microbiome community used as a standard control for gnotobiotic mice; murine-pathogen-free mice (MPF)
        </p>
        </div>
        </Box>

        <br />
        <div style={{textAlign: "left"}}>
        <p style={{fontSize: 19}}><strong>Statistical Methods</strong></p>
        </div>

        <Box>
        <div style={{marginLeft: 15, marginTop: 20, fontSize: 18, textAlign: "left"}}>

        <p><strong>
        Single-Cell RNA-Seq
        </strong></p>

        <p>
        Study Design: scRNA-seq was performed on total bone marrow (BM: 41,836 cell barcodes), CD117+ BM progenitor cells (35,466 cell barcodes), and total splenocytes (61,636 cell barcodes). As single-cell observations can vary from animal-to-animal, we applied antibody cell-hashing to delineate individual cells from 4 biological replicates per group for each flow sorted group. To assign cell-populations, we performed unsupervised clustering with a resolution-agnostic approach (ICGS2) in each dataset and subsequently annotated cell populations by cell-type marker gene enrichment (GO-Elite). In addition to augmenting these annotations based on prior literature marker associations, according to manual curation based on the literature, to distinguish discrete BM progenitors with described lineage outputs, we additionally applied supervised classification of CD117+ captured cells to a well-defined set of prior curated discrete stem and progenitor populations.
        </p>
 
        <p>
        {"Differentially Gene Expression: Significantly differentially expressed genes were defined as those with a comparison fold > 1.2 (up- or down-regulated) and an eBayes p<0.05 in both the single-cell and biological replicate pseudobulk comparisons, with a Benjamini Hochberg false discovery rate adjustment in single-cell level analyses.  To ensure that the differential gene expression results can be replicated at both the single-cell and pseudobulk replicate animal levels, we required reported the same gene to pass the denoted statistical thresholds and direction of regulation for the same microbiome comparisons."}
        </p>
 
        <p><strong>
        Serum Metabolomics
        </strong></p>

        <p>
        Study Design: Untargeted ultrahigh-pressure liquid chromatography in tandem with mass spectrometry (uHPLC/MS, Metabolon) was performed on serum from mice with the above defined flora (n=8-12 animals per group). The metabolomics analysis confidently detected and quantified 1150 total biochemicals. These data were processed within the MetabolyzerTM software. The quality control procedure includes matrix-specific technical replicates and QC injections across each set of samples analyzed in a batch. Identified metabolites include prior annotated as well as novel metabolites observed in prior studies by Metabolon.
        </p>
 
        <p>
        {"Differentially Metabolites: Significantly differential metabolites were determined from a Welch two sample t-test (p<0.05) for all microbiome groups versus germ free."}
        </p>
        </div>
        </Box>
        <div style={{textAlign: "left"}}>
        </div>
    </div>
    );
}

export default AboutUs;