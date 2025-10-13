import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-DxsVXlKp.js";import{w as m,c as D}from"./ContextDecorators-BduKEHIi.js";import{K as b}from"./schema.zod-Px6u-bsi.js";import{u as _}from"./useKandidatlisteForEier-Bo37vYrz.js";import{F as y,A as N}from"./FullførtStilling-DeIA5WA7.js";import{R as T}from"./GjenåpneStillingKnapp-DnKJB0Hk.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-D4U8jm_K.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DBaap_3A.js";import"./OrganisasjonsnummerAlert-BRaz6LhX.js";import"./VStack-DLr41Sdy.js";import"./BasePrimitive-CVWzEEGe.js";import"./List-Zu0w8-Ow.js";import"./Link-DSnwK8eh.js";import"./KandidatHendelseTag-BzJ2Q9HZ.js";import"./Tag-B0WwZ_XI.js";import"./FileXMark-BOhJsIZe.js";import"./Trash-DXDOAyr4.js";import"./HandShakeHeart-cnO-6KOG.js";import"./Calendar-DrSgH4O2.js";import"./ThumbUp-DKmETQk-.js";import"./Table-DmsM-QeC.js";import"./util-0q4bkZIV.js";import"./format-oEh3d8nI.js";import"./match-C6gf6vFE.js";import"./parseISO-DtIkSN4o.js";import"./parse-SU3b4A8Q.js";import"./getDefaultOptions-zjHXmn5U.js";import"./util-D7yesipt.js";import"./kandidat.mock-n3hSVeXH.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-B0oh35my.js";import"./index-B8oWlYsg.js";import"./index-D9AVDUEx.js";import"./index-DwpsUNGy.js";import"./ChevronDown-D_-r46n6.js";import"./Box-D6vu7JAx.js";import"./Bell-Bu-1Uzd9.js";import"./PersonChat-DYq_6WPS.js";import"./Eye-BlXhdp-v.js";import"./ProgressBar-DdBEUU5R.js";import"./oppdaterStilling-BvDZmHXi.js";import"./EyeSlash-CSsbxHlQ.js";import"./CircleSlash-DkJeMFHU.js";import"./Modal-D_gdxlCP.js";import"./floating-ui.react-Bc1Ow91n.js";import"./Date.Input-BMLFi-Sw.js";import"./useFormField-y2vpLvjz.js";import"./useControllableState-332WqRZ5.js";import"./Modal.context-B9ZjbwV3.js";import"./Checkbox-Dm28Muw-.js";import"./Fieldset-CsRHJJDL.js";import"./Pencil-3cP27ziS.js";import"./PersonbrukerTekst-BmPfDESq.js";import"./ClockDashed-AYmePuZv.js";import"./Tasklist-DNntOWaS.js";import"./ErrorBoundary-Dipjc830.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
