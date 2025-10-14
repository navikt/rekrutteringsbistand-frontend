import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cp as b,aG as g,cB as u,aP as y,cC as _}from"./iframe-Toj4pykk.js";import{w as d,c as D}from"./ContextDecorators-DrlChovi.js";import{F as N,A as v}from"./FullførtStilling-DZY2IGob.js";import{R as T}from"./GjenåpneStillingKnapp-DkSSuPlx.js";import{T as A}from"./TilgangskontrollForInnhold-zx12ydyf.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DSBqXm2s.js";import"./OrganisasjonsnummerAlert-g64K9oEi.js";import"./VStack-Cvr9eCR3.js";import"./BasePrimitive-DPRW-2ci.js";import"./List-6umJsgvh.js";import"./Link-CnRvrC1D.js";import"./KandidatHendelseTag-Bv77E4ep.js";import"./Tag-Da0VVrnZ.js";import"./FileXMark-CXngGzHw.js";import"./Trash-D3GH5m_z.js";import"./HandShakeHeart-Cg646Fa_.js";import"./Calendar-DbsWeNMw.js";import"./ThumbUp-DA1fCJZp.js";import"./Table-wHMVrjQU.js";import"./util-CkgJohuK.js";import"./format-DkxpHWLB.js";import"./match-cULtJEmT.js";import"./parseISO-CY5p6dlu.js";import"./parse-wdjbf7Nz.js";import"./getDefaultOptions-CMKcdfqW.js";import"./util-QhXL_9PD.js";import"./accordion-ao0LvHWh.js";import"./index-CpTK2_OX.js";import"./index-YiecnjqY.js";import"./index-ClGG8aMP.js";import"./ChevronDown-DBDFtXTt.js";import"./Box-BaaBYAmr.js";import"./Bell-DO4MVgQF.js";import"./PersonChat-DFqxLPvB.js";import"./Eye-CL07F-hu.js";import"./ProgressBar-a60OvFgM.js";import"./EyeSlash-C9gHc8hm.js";import"./CircleSlash-6j0IsSu1.js";import"./Modal-C8GbhWYT.js";import"./floating-ui.react-BQ3mxbEN.js";import"./Date.Input-Dr0SC9lG.js";import"./useFormField-Ckpw-EIc.js";import"./useControllableState-CwIFAokw.js";import"./Modal.context-vL2zOWLK.js";import"./Checkbox-DEhxybAi.js";import"./Fieldset-CzZ2vmYY.js";import"./Pencil-YTRVNVK0.js";import"./PersonbrukerTekst-CJEOdQfr.js";import"./ClockDashed-B_9gmdOt.js";import"./Tasklist-DghUijlf.js";import"./ErrorBoundary-aEbhARa-.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
