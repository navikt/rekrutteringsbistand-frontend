import{h as I,j as t,aM as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-Cz03cNnU.js";import{w as m,c as D}from"./ContextDecorators-Ytqa4qdV.js";import{K as b}from"./schema.zod-DyLaNSHo.js";import{u as _}from"./useKandidatlisteForEier-D-2rSPIc.js";import{F as y,A as N}from"./FullførtStilling-D8uroCOR.js";import{R as T}from"./GjenåpneStillingKnapp-CnG6E3Z3.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-DqzH33EP.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DOiKwQlj.js";import"./OrganisasjonsnummerAlert-A6V_r_9p.js";import"./VStack-Dn4Om_V9.js";import"./BasePrimitive-xMOo3z-A.js";import"./List-BkBSIZ9o.js";import"./Link-D-wNG8OT.js";import"./KandidatHendelseTag-DMBTlFvq.js";import"./Tag-D0BEl-Rx.js";import"./FileXMark-D8OhWEgM.js";import"./Trash-YSKNBnBc.js";import"./HandShakeHeart-B4UWzEb8.js";import"./Calendar-CPEpsnvW.js";import"./ThumbUp-BnMzPauv.js";import"./Table-CaMwSQ-S.js";import"./util-mkC834Ef.js";import"./format-BtonrWpy.js";import"./match-YUn_3ltH.js";import"./parseISO-CQ9F3tRX.js";import"./parse-DIF_idgU.js";import"./getDefaultOptions-B0jo0GfK.js";import"./util-CtK3LrTT.js";import"./kandidat.mock-p8VTWFLb.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DsM__f87.js";import"./index-CIb6jtHX.js";import"./index-BmEtA6tj.js";import"./index-RsXGIaZy.js";import"./ChevronDown-ChhOAzu5.js";import"./Box-BkzG92kA.js";import"./Bell-Bx7HexFU.js";import"./PersonChat-Db9DrxrJ.js";import"./Eye-DydUwfT6.js";import"./ProgressBar-DLOn4bpU.js";import"./oppdaterStilling-BH_xx0Ia.js";import"./EyeSlash-DmrP9Swd.js";import"./CircleSlash-RkGLzKOv.js";import"./Modal-D5YTGJOP.js";import"./floating-ui.react-D-zVLpts.js";import"./Date.Input-DKz4iTU4.js";import"./useFormField-BUPAi8Oh.js";import"./useControllableState-BjXV5lxt.js";import"./Modal.context-CDADyR-h.js";import"./Checkbox-CPCozRTE.js";import"./Fieldset-Bkmnj6eJ.js";import"./Pencil-D3E46UDI.js";import"./PersonbrukerTekst-CksDJXxR.js";import"./ClockDashed-BKhe5ozv.js";import"./Tasklist-DdJFMyHo.js";import"./ErrorBoundary-rOv_WJrN.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
