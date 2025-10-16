import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cr as b,aG as g,co as u,aP as y,cD as _}from"./iframe-BjHUBmX4.js";import{w as d,c as A}from"./ContextDecorators-DdoQcOSc.js";import{F as N,A as v}from"./FullførtStilling-KMIankiM.js";import{R as T}from"./GjenåpneStillingKnapp-Du3t5KJp.js";import{T as D}from"./TilgangskontrollForInnhold-Pcn0Rm1U.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DF_utew7.js";import"./OrganisasjonsnummerAlert-BnLZ4rcb.js";import"./VStack-BK0ELjpD.js";import"./BasePrimitive-BYSphrt3.js";import"./List-DThvJkRM.js";import"./Link-Dle1PRY7.js";import"./KandidatHendelseTag-BcSGIywJ.js";import"./Tag-CAplgxW9.js";import"./FileXMark-CHsP7GTj.js";import"./Trash-zcYvc2Ft.js";import"./HandShakeHeart-BHcDKPN3.js";import"./Calendar-B1aBhGpE.js";import"./ThumbUp-BVzuf8X0.js";import"./Table-IZ5HbG_Z.js";import"./util-RxryBtRb.js";import"./format-CEnvRZey.js";import"./match-Dw11ZSP6.js";import"./parseISO-BIccb9Iy.js";import"./parse-D5XBI5ZB.js";import"./getDefaultOptions-BwZq2dmU.js";import"./util-oy-2ETrN.js";import"./accordion-DKz8651N.js";import"./index-DrziEsfj.js";import"./index-qKAHKYom.js";import"./index--X-MZGjs.js";import"./ChevronDown-BkMDEC1C.js";import"./Box-CuZSUbSP.js";import"./Bell-Bsv7Uarc.js";import"./PersonChat-B0tzpWJD.js";import"./Eye-Caph4yv4.js";import"./ProgressBar-Cxz37jDD.js";import"./EyeSlash-CAGiai3K.js";import"./CircleSlash--Ang9t33.js";import"./Modal-nT3A2Dfs.js";import"./floating-ui.react-3KoqlXCl.js";import"./Date.Input-CtMaRWbp.js";import"./useFormField-D2XQg2fU.js";import"./useControllableState-Co_ihWoO.js";import"./Modal.context-BPs9_y3Y.js";import"./Checkbox-Cu7f4-zV.js";import"./Fieldset-WnWkOO6_.js";import"./Pencil-BbKvXvtD.js";import"./PersonbrukerTekst-BWsjodRk.js";import"./ClockDashed-Be0MRpbC.js";import"./Tasklist-DKVOS2S-.js";import"./ErrorBoundary-xHFTxBig.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
