import{ac as I,ad as w,j as t,R as k,S as x,ch as j,cl as b,aG as g,ci as u,aP as y,cx as _}from"./iframe-C5WYDDgG.js";import{w as d,c as D}from"./ContextDecorators-D8p2HP-6.js";import{F as N,A as v}from"./FullførtStilling-C4jS4iIw.js";import{R as T}from"./GjenåpneStillingKnapp-Cw2UTxFg.js";import{T as A}from"./TilgangskontrollForInnhold-0nOLe2q2.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DvE1vsyh.js";import"./OrganisasjonsnummerAlert-C85y1jZg.js";import"./VStack-CGjISBtE.js";import"./BasePrimitive-Cpkpxro0.js";import"./List-DAOF7kuF.js";import"./Link-Crh-IT43.js";import"./KandidatHendelseTag-CsB2A49T.js";import"./Tag-DimcxUST.js";import"./ChatExclamationmark-BPFzi1ZK.js";import"./FileXMark-C2nd-YET.js";import"./Trash-dUh1hCIp.js";import"./HandShakeHeart-BLwS6NQP.js";import"./Calendar-Br9eUOU1.js";import"./ThumbUp-D-407tMV.js";import"./Table-CTdTQr35.js";import"./util-wTlgndPH.js";import"./format-D6tTPMvi.js";import"./match-CesVRQGT.js";import"./parseISO-DB2fE1bN.js";import"./parse-6GhogZDZ.js";import"./getDefaultOptions-CBL_1nw2.js";import"./util-xKC9If_S.js";import"./accordion-8O6R1JI7.js";import"./index-jui_4ML_.js";import"./index-CUfkLDky.js";import"./index-DAXOghd5.js";import"./ChevronDown-C4tZxf6w.js";import"./Box-BBnZacNc.js";import"./Bell-DO37ejI4.js";import"./PersonChat-BjgQvdeY.js";import"./Eye-CCTzgc4h.js";import"./ProgressBar-BIQ5BEyC.js";import"./EyeSlash-jp4ZLYrk.js";import"./CircleSlash-DiW_dngZ.js";import"./Modal-DEM_RWCt.js";import"./floating-ui.react-Cm-18w_6.js";import"./Date.Input-Bq2Wg-Yo.js";import"./useFormField-2ZYty3U6.js";import"./useControllableState-Cdxfncmo.js";import"./Modal.context-CyBBT6uy.js";import"./Checkbox-B1V-Y0M2.js";import"./Fieldset-Bj15ZXtM.js";import"./Pencil-a4eSB7OK.js";import"./PersonbrukerTekst-BS8SCY1V.js";import"./ClockDashed-D5FGwYdF.js";import"./Tasklist-03_GDAnO.js";import"./ErrorBoundary-CIYpb9Bs.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
